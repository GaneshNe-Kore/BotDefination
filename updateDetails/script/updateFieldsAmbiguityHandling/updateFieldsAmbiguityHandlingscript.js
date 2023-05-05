var updateFields = context.updateFields.filter(obj => context.entities.captureUpdateField.includes(obj.value));
context.updateFields = updateFields;

delete context.entities.captureUpdateField;