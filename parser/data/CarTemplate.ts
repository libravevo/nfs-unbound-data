import { Car           } from "./Car.js"
import { CarVisualPart } from "./CarVisualPart.js"

export class CarTemplate {
    name        : {
                    brand : string,
                    model : string,
                    year  : number
                }
    cars        : Car[]
    visualParts : CarVisualPart[]
    scopesLength : number
    totalScopes  : number
    purchaseLength : number
    totalPurchase : number
    uiLength : number
    totalUi : number = 0

    constructor(
        public path      : string,
               brand     : string,
               model     : string,
               year      : number,
        public isTraffic : boolean = false
    ) {
        this.name = {
            brand : brand,
            model : model,
            year  : year
        }
        this.cars        = []
        this.visualParts = []
        this.scopesLength = 0;
        this.totalScopes = 0;
        this.purchaseLength = 0;
        this.totalPurchase = 0;
        this.uiLength = 0;
        this.totalUi = 0;
    }

    getName(): string {
        return `${this.name.brand}_${this.name.model}_${this.name.year}`
    }
}
