import type {HydratedDocument, Types} from 'mongoose';
import type {Community} from './model';
import CommunityModel from './model';
import UserCollection from '../user/collection';


class CommunityCollection {
    /**
     * Add community to collection
     * 
     * @param {string} creatorId - Id of the creator
     * @param {string} name - name of the community
     * @return {Promise<HydratedDocument<Community>>} - the new community
     */
    static async addOne(creatorId : Types.ObjectId | string, name : string) : Promise<HydratedDocument<Community>>{
        const date = new Date();
        const community = new CommunityModel({
            creatorId,
            dateCreated: date,
            name
        });
        await community.save();
        return community.populate('creatorId');
    }

    /**
     * find community by id
     * 
     * @param {string} commId - id of the community
     * @return {Promise<HydratedDocument<Community>> | Promise<null>} - the community with the given id if any
     */
    static async findOne(commId : Types.ObjectId | string): Promise<HydratedDocument<Community>> {
        return CommunityModel.findOne({_id: commId}).populate('creatorId');
    }

    /**
     * Find a community by name (case insensitive).
     *
     * @param {string} name - The name of the community to find
     * @return {Promise<HydratedDocument<Community>> | Promise<null>} - The community with the given name, if any
     */
    static async findOneByName(name: string): Promise<HydratedDocument<Community>> {
        return CommunityModel.findOne({name: new RegExp(`^${name.trim()}$`, 'i')});
    }

    /**
     * Get all the communities in the database
     *
     * @return {Promise<HydratedDocument<Community>[]>} - An array of all of the communities
     */
    static async findAll(): Promise<Array<HydratedDocument<Community>>> {
        // Retrieves communities and sorts them from most to least recently created
        return CommunityModel.find({}).sort({dateCreated: -1}).populate('authorId');
    }

    /**
     * Delete a community with given Id
     *
     * @param {string} commId - The Id of community to delete
     * @return {Promise<Boolean>} - true if the freet has been deleted, false otherwise
     */
    static async deleteOne(commId: Types.ObjectId | string): Promise<boolean> {
        const community = await CommunityModel.deleteOne({_id: commId});
        return community !== null;
    }
}

export default CommunityCollection;