import "dotenv/config";
import * as ZOHOCRMSDK from "@zohocrm/nodejs-sdk-8.0";

initialize()
  .then(
    () => res.send("Initialised")
    // createLeads(moduleAPIName)
    //   .then(() => res.send("Record created"))
    //   .catch((err) => {
    //     res.end();
    //   })
  )
  .catch((err) => {
    res.end();
  });

export const pushLead = async (req, res) => {
  // Extract leads from the URL parameter which is sent by Justdial
  const leads = req.query;

  // Structure data from leads
  const finalData = {
    justDialId: leads.leadid || "",
    leadType: leads.leadtype || "",
    firstName: `${leads.prefix || "null"}. ${leads.name || "null"}`,
    lastName: leads.name,
    mobile: leads.mobile || "",
    phone: leads.phone || "",
    email: leads.email || "",
    leadPushTime: `${leads.date || "0000/00/00"} ${leads.time || "00:00:00"}`,
    date: leads.date || "",
    category: leads.category || "",
    city: leads.city || "",
    street: leads.Area || "",
    branchArea: leads.brancharea || "",
    dnd: leads.dncmobile === 0 ? "Call now" : leads.dncmobile == "" ? "" : "Do not Disturb",
    companyName: leads.company || "",
    zipCode: leads.pincode || "",
    branchId: leads.branchpin || "",
    parentId: leads.parentid || "",
    leadSource: "JD",
  };

  // Function to Authenticate and initialize zoho crm
  const initialize = async () => {
    // Development - DEVELOPER(), Production-PRODUCTION(), Sandbox-SANDBOX()
    let environment = ZOHOCRMSDK.INDataCenter.PRODUCTION();

    let token = new ZOHOCRMSDK.OAuthBuilder()
      .clientId(process.env.ZOHOCRM_CLIENT_ID)
      .clientSecret(process.env.ZOHOCRM_CLIENT_SECRET)
      .refreshToken(process.env.ZOHOCRM_REFRESH_TOKEN)
      .build();

    await (await new ZOHOCRMSDK.InitializeBuilder()).environment(environment).token(token).initialize();
  };

  // Function to create and push leads to zoho crm
  const createLeads = async (moduleAPIName) => {
    let recordOperations = new ZOHOCRMSDK.Record.RecordOperations(moduleAPIName);
    let request = new ZOHOCRMSDK.Record.BodyWrapper();
    let data = [];
    let lead1 = new ZOHOCRMSDK.Record.Record();

    // For System defined fields
    lead1.addKeyValue("First_Name", finalData.firstName);
    lead1.addKeyValue("Last_Name", finalData.lastName);
    lead1.addKeyValue("Mobile", finalData.mobile);
    lead1.addKeyValue("Phone", finalData.phone);
    lead1.addKeyValue("Email", finalData.email);
    lead1.addKeyValue("City", finalData.city);
    lead1.addKeyValue("Street", finalData.street);
    lead1.addKeyValue("Zip_Code", finalData.zipCode);
    lead1.addKeyValue("Lead_Source", new ZOHOCRMSDK.Choice("JD"));

    // For Custom fields
    lead1.addKeyValue("Justdial_Id", finalData.justDialId);
    lead1.addKeyValue("Lead_Type", finalData.leadType);
    lead1.addKeyValue("Date", new Date(finalData.date));
    lead1.addKeyValue("Category", finalData.category);
    lead1.addKeyValue("Branch_Area", finalData.branchArea);
    lead1.addKeyValue("DND", finalData.dnd);
    lead1.addKeyValue("Company_Name", finalData.companyName);
    lead1.addKeyValue("Branch_Id", finalData.branchId);
    lead1.addKeyValue("Parent_Id", finalData.parentId);
    lead1.addKeyValue("indiamartleadsofficialpluginforrealtimeleads__Lead_Push_Time", finalData.leadPushTime);

    // Add Record instance to List
    data.push(lead1);
    request.setData(data);
    let headerInstance = new ZOHOCRMSDK.HeaderMap();

    // Create a record
    let response = await recordOperations.createRecords(request, headerInstance);

    if (response != null) {
      console.log("Status Code: " + response.getStatusCode());
      let responseObject = response.getObject();

      if (responseObject != null) {
        if (responseObject instanceof ZOHOCRMSDK.Record.ActionWrapper) {
          let actionResponses = responseObject.getData();

          actionResponses.forEach((actionResponse) => {
            if (actionResponse instanceof ZOHOCRMSDK.Record.SuccessResponse) {
              console.log("Status: " + actionResponse.getStatus().getValue());
              console.log("Code: " + actionResponse.getCode().getValue());
              console.log("Details");

              let details = actionResponse.getDetails();

              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ": " + details.get(key));
                });
              }

              console.log("Message: " + actionResponse.getMessage().getValue());
            } else if (actionResponse instanceof ZOHOCRMSDK.Record.APIException) {
              console.log("Status: " + actionResponse.getStatus().getValue());
              console.log("Code: " + actionResponse.getCode().getValue());
              console.log("Details");

              let details = actionResponse.getDetails();

              if (details != null) {
                Array.from(details.keys()).forEach((key) => {
                  console.log(key + ": " + details.get(key));
                });
              }

              console.log("Message: " + actionResponse.getMessage().getValue());
            }
          });
        } else if (responseObject instanceof ZOHOCRMSDK.Record.APIException) {
          console.log("Status: " + responseObject.getStatus().getValue());
          console.log("Code: " + responseObject.getCode().getValue());
          console.log("Details");

          let details = responseObject.getDetails();

          if (details != null) {
            Array.from(details.keys()).forEach((key) => {
              console.log(key + ": " + details.get(key));
            });
          }

          console.log("Message: " + responseObject.getMessage().getValue());
        }
      }
    }
  };

  let moduleAPIName = "leads";
};
