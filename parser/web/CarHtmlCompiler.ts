import { log } from "../util/Log.js"
import { Eta } from "eta";

import { CarVisualPart } from "../data/CarVisualPart.js"
import { Car           } from "../data/Car.js"

import { Context } from "../Context.js"
import * as nodePath from 'path';

let fs   = require("fs")
let path = require("path")

const eta = new Eta({ views : path.join(__dirname, "templates"), autoTrim: ["slurp", false] })

export class CarHtmlCompiler {
    static compile(context: Context): Context {
        const separator = nodePath.sep;

        let carGroups = {}
        for (let template of context.carTemplates) {
            if (carGroups[template.name.brand] === undefined) {
                carGroups[template.name.brand] = []
            }
            carGroups[template.name.brand].push(template)
        }

        log.info("CarHtmlCompiler :: Building HTML documents for cars")

        for (let template of context.carTemplates) {
            let types = []
            let sets  = []
            template.visualParts.forEach((it) => {
                // Create lists of all unique sets and types to be used later
                if (!types.includes(it.type)) {
                    types.push(it.type)
                }
                if (!sets.includes(it.set.toLowerCase()) && it.set.toLowerCase() != "shared") {
                    sets.push(it.set.toLowerCase())
                }
            })

            types = types.sort()
            sets  = sets.sort()

            // Sort parts by set for templating
            let partsBySet = {}
            for (let set of sets) {
                partsBySet[set] = []
                for (let type of types) {
                    partsBySet[set].push(
                        template.visualParts.filter((it) => {
                            return (it.set.toLowerCase() == set && it.type == type)
                        })[0]
                    )
                }
            }

            // Filter out empty columns
            // Need to iterate on a shallow copy of the type array
            // As the original will be modified in this loop
            for (let type of types.slice()) {
                let typeParts = []
                for (let set in partsBySet) {
                    typeParts = typeParts.concat(partsBySet[set].filter((it) => { return it !== undefined && it.type === type }))
                }
                if (typeParts.length == 0) {
                    log.dbug(`CarHtmlCompiler :: Removing empty type ${type} from car ${template.getName()}`)
                    let typeIndex = types.indexOf(type, 0)
                    for (let set in partsBySet) {
                        partsBySet[set].splice(typeIndex, 1)
                    }
                    types.splice(typeIndex, 1)
                }
            }

            for(let set of sets){
                for(let part of partsBySet[set]){
                    if(part != null) {
                        template.scopesLength += part.scopes.length;
                        part.totalScopes == 0 ? template.totalScopes += template.cars.length : template.totalScopes += part.totalScopes;

                        if(part.flags.purchasable) template.purchaseLength++;
                        template.totalPurchase++;

                        if(part.flags.ignoreUI) template.uiLength++;
                        template.totalUi++;
                    }
                }
            }

            // Support backout with custom folders. e.g. specify the output folder as *path*\*out*\custom, drop the custom folder in the docs dir and add the entry to index.html
            // TODO: assuming output folder is named "out"
            // TODO: fix output folder must contain the "cars" folder
            let dir = context.args.outPath.split(separator).at(-1) == "out" ? "" : "/" + context.args.outPath.split(separator).at(-1);
            let current = "/nfs-unbound-data" + dir;

            // Render main table with Eta
            let document = eta.render("./root", {
                body : eta.render("./carPartTable", {
                    headers : types,
                    sets    : sets,
                    parts   : partsBySet,
                    scopes  : template.cars,
                    brand : template.name.brand,
                    path: current
                })
            })

            // Write table HTML files
            let outFile = path.join(context.args.outPath, `cars/${template.getName()}.html`)
            log.info(`CarHtmlCompiler :: Writing ${outFile}`)
            fs.writeFileSync(
                outFile,
                document, 
                { flag : 'w' }
            )
        }

        log.info("CarHtmlCompiler :: Generating listing HTML")

        let document = eta.render("./root", {
            body : eta.render("./list", {
                itemGroups : carGroups
            })
        })

        log.info("CarHtmlCompiler :: Writing listing file")
        fs.writeFileSync(
            path.join(context.args.outPath, "carlist.html"),
            document,
            { flag : 'w' }
        )

        return context
    }
}
