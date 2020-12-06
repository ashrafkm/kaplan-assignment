import { Document, Model, model, Schema } from 'mongoose';
import { IAssignment } from '../interface/assignment';

export interface IAssignmentModel extends IAssignment, Document {

}

export interface AssignmentModelInterface extends Model<IAssignmentModel> {

}

export let AssignmentSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    uniqueTitle: {
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    duration: {
        type: Number
    },
    tags: {
        type: [String]
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    deleted: {
        type: Number,
        default: 0
    },
});




export const Assignment: AssignmentModelInterface = model<IAssignmentModel, AssignmentModelInterface>('assignment', AssignmentSchema, 'assignment');
