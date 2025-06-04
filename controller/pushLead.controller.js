import "dotenv/config";
import { initializeZoho } from "../init/initializer.js";
import { Record, HeaderMap, Choice } from "@zohocrm/nodejs-sdk-8.0";

await initializeZoho();

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

  // Function to create and push leads to zoho crm
  const createLeads = async (moduleAPIName) => {
    let recordOperations = new Record.RecordOperations(moduleAPIName);
    let request = new Record.BodyWrapper();
    let data = [];
    let lead1 = new Record.Record();

    // For System defined fields
    lead1.addKeyValue("First_Name", finalData.firstName);
    lead1.addKeyValue("Last_Name", finalData.lastName);
    lead1.addKeyValue("Mobile", finalData.mobile);
    lead1.addKeyValue("Phone", finalData.phone);
    lead1.addKeyValue("Email", finalData.email);
    lead1.addKeyValue("City", finalData.city);
    lead1.addKeyValue("Street", finalData.street);
    lead1.addKeyValue("Zip_Code", finalData.zipCode);
    lead1.addKeyValue("Lead_Source", new Choice("JD"));

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
    let headerInstance = new HeaderMap();

    // Create a record
    let response = await recordOperations.createRecords(request, headerInstance);

    if (response != null) {
      console.log("Status Code: " + response.getStatusCode());
      let responseObject = response.getObject();

      if (responseObject != null) {
        if (responseObject instanceof Record.ActionWrapper) {
          let actionResponses = responseObject.getData();

          actionResponses.forEach((actionResponse) => {
            if (actionResponse instanceof Record.SuccessResponse) {
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
            } else if (actionResponse instanceof Record.APIException) {
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
        } else if (responseObject instanceof Record.APIException) {
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

    res.status(200).json({ message: "RECEIVED" }).send("RECEIVED");
  };

  let moduleAPIName = "leads";
  await createLeads(moduleAPIName);
};
