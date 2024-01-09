const midtransClient = require("midtrans-client")
 
 
 const coreApi = new midtransClient.CoreApi({
    isProduction : false,
    serverKey: "SB-Mid-server-FklZmrxLNQkUtf0FG1mirxbl",
    clientKey: "SB-Mid-client-Z9BRD_fmglNBTIAK",
})

module.exports = {
    charge: async (parameter) => {
        try {
            return await coreApi.charge(parameter);
        } catch (error) {
            throw error;
        }
    },
    cardToken: async (parameter) => {
        try {
            return await coreApi.cardToken(parameter);
        } catch (error) {
            throw error;
        }
    },
};