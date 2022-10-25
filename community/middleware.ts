import type {Request, Response, NextFunction} from 'express';
import {Types} from 'mongoose';
import CommunityCollection from './collection';

/**
 * Checks if the current user is the creator of the community whose commId is in req.params
 */
 const isValidCommunityModifier = async (req: Request, res: Response, next: NextFunction) => {
    const community = await CommunityCollection.findOne(req.params.commId);
    const creatorId = community.creator._id;
    if (req.session.userId !== creatorId.toString()) {
      res.status(403).json({
        error: 'Cannot modify other users\' communities.'
      });
      return;
    }
  
    next();
  };

  /**
   * Check if a community name is already in use
   */
   const isCommunityNotAlreadyInUse = async (req: Request, res: Response, next: NextFunction) => {
    const community = await CommunityCollection.findOneByName(req.body.name);
  
    if (!community) {
      next();
      return;
    }
  
    res.status(409).json({
      error: {
        name: 'A community with this name already exists.'
      }
    });
  };

  /**
   * Check if a community with given id exists
   */
  const isCommunityExists = async(req : Request, res: Response, next: NextFunction) => {
    const community = await CommunityCollection.findOne(req.body.commId);

    if(!community){
        next();
        return;
    }

    res.status(404).json({
        error: "A community with this Id does not exist"
    })
  }

  export {
    isValidCommunityModifier,
    isCommunityNotAlreadyInUse,
    isCommunityExists
  }