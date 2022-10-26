import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import * as userValidator from '../user/middleware';
import CommunityCollection from './collection';
import * as commValidator from '../community/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Create a new community
 * 
 * @name POST /api/communities
 * 
 * @param {string} name - The name of the community
 * @return {CommunityResponse} - The created community
 * @throws {403} - If the user is not logged in
 * @throws {409} - If the community already exists
 */

router.post(
    '/',
    [
        userValidator.isUserLoggedIn,
        commValidator.isCommunityNotAlreadyInUse
    ],
   async (req:Request, res: Response) => {
    const userId = (req.session.userId as string) ?? '';
    const community = await CommunityCollection.addOne(userId, req.body.name);

    res.status(201).json({
        message: 'community created succesfully',
        community: util.constructCommunityResponse(community)
    })
   }
)

/**
 * Delete a community
 * 
 * @name DELETE /api/communities/:commId?
 * 
 * @return {string} a success message
 * @throws {403} if the user is not logged in or the owner of the community
 * @throws {404} if the commId is not valid
 */
router.delete(
    '/:commId?',
    [
        userValidator.isUserLoggedIn,
        commValidator.isCommunityExists,
        commValidator.isValidCommunityModifier
    ],
    async (req: Request, res: Response) => {
        await CommunityCollection.deleteOne(req.params.commId);
        res.status(200).json({
            message: 'your community was deleted successfully'
        })
    }
)

export {router as communityRouter};