const mongoose = require('mongoose');
import { Assignment } from '../src/schema/assignment';
import * as config from 'config';
const payload = { title: 'test', type: "test", description: "test", tags: [] };

describe('Assignment Test', () => {

    // It's just so easy to connect to the MongoDB Memory Server 
    // By using mongoose.connect
    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
            if (err) {
                console.log('err1111: ', err);

                // console.error(err);
                process.exit(1);
            }
        });
    });

    it('create new assignment', async () => {
        const validData = new Assignment(payload);
        const savedData: any = await validData.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedData._id).toBeDefined();
        expect(savedData.title).toBe(payload.title);
        expect(savedData.type).toBe(payload.type);
        expect(savedData.description).toBe(payload.description);
    });

    // Test Schema is working!!!
    // You shouldn't be able to add in any field that isn't defined in the schema
    it('insert successfully, but the field does not defined in schema should be undefined', async () => {
        const userWithInvalidField: any = new Assignment({ title: 'TekLoon', type: 'Male', description: 'Handsome TekLoon' });
        const savedDataWithInvalidField = await userWithInvalidField.save();
        expect(savedDataWithInvalidField._id).toBeDefined();
        expect(savedDataWithInvalidField.duration).toBeUndefined();
    });

    // Test Validation is working!!!
    // It should us told us the errors in on gender field.
    it('create without required field should failed', async () => {
        const userWithoutRequiredField = new Assignment({ title: 'TekLoon' });
        let err;
        try {
            const savedDataWithoutRequiredField = await userWithoutRequiredField.save();
            err = savedDataWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.type).toBeDefined();
    });


})