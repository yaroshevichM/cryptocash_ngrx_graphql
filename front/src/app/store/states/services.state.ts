import { IService } from "../../models/Service";

export interface IServicesState {
   servicesData: Array<IService>
   currentService: IService
}

export const initialServicesState = {
   servicesData: null,
   currentService: null,
}