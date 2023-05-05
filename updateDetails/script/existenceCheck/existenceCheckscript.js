// if(context.entities.personalFields && context.traits && context.traits.includes("updateemail")) {
//     context.entities.personalFields === "email"
// }
// context.fieldExists = true;
var accData = context.accountData;
if(context.entities.personalFields && context.entities.profileOrAccountLevel && context.entities.profileOrAccountLevel === "Account" && context.entities.AccountType) {
    accData = accData.filter(x=> context.entities.AccountType.includes(x.accountNumber));
    if(accData && accData.length ===1) {
        if(context.entities.personalFields && (context.entities.personalFields === "primaryPhone" || context.entities.personalFields === "AlternatePhone")) {
            context.fieldExists = accData[0]["phone"] ? true : false
        } else {
            context.fieldExists = accData[0][context.entities.personalFields] ? true : false
        }
    }
}