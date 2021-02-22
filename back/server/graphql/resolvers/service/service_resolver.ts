import Service from "../../../models/Service"

export const serviceQueries = {

   getAllServices: async () => {
      const services = await Service.find();

      return services.map(service => {
         return service.toObject()
      })
   },

   getServiceById: async (_, args) => {
      const service = await Service.findById(args.serviceId);
      return service.toObject();
   }

}

export const serviceMutations = {
   createService: async (_, args) => {

      try {
         const service = new Service({
            name: args.serviceInput.name,
            cardNumber: args.serviceInput.cardNumber,
         })

         const savedService = await service.save();

         return savedService.toObject()
      } catch (error) {
         throw error
      }

   }
}