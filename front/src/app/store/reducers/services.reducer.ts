import { EServicesActions, servicesActions } from "../actions/services.action";
import { initialServicesState } from "../states/services.state";

export const servicesReducer = (state = initialServicesState, action: servicesActions) => {
   switch (action.type) {
      case EServicesActions.SERVICES_COMPLETED:
         return { ...state, servicesData: action.payload }

      case EServicesActions.SERVICE_BY_ID_COMPLETED:
         console.log(action.payload)
         return { ...state, currentService: action.payload }

      default:
         return { ...state };
   }
}