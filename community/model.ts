import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';
import type {User} from '../user/model'
import type { PopulatedFreet } from 'freet/model';
import UserCollection from 'user/collection';


export type Community = {
    _id: Types.ObjectId;
    name: string;
    dateCreated: Date;
    creator: User;
    users: Set<User>;
    freets: Set<PopulatedFreet>;
}

const CommunitySchema = new Schema<Community>({
    name: {
        type: String,
        required: true,
        ref: 'Community'
    },
    dateCreated: {
        type: Date,
        required: true
    }
})

const CommunityModel = model<Community>('Community', CommunitySchema);
export default CommunityModel;