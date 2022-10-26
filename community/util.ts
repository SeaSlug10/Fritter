import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Community} from './model';

// Update this if you add a property to the User type!
type CommunityResponse = {
  _id: string;
  name: string;
  dateCreated: string;
  creator: string;
};

/**
 * Encode a date as an unambiguous string
 *
 * @param {Date} date - A date object
 * @returns {string} - formatted date as string
 */
const formatDate = (date: Date): string => moment(date).format('MMMM Do YYYY, h:mm:ss a');

/**
 * Transform a raw Community object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Community>} comm - A Community object
 * @returns {CommunityResponse} - The commnity object
 */
const constructCommunityResponse = (comm: HydratedDocument<Community>): CommunityResponse => {
  const commCopy: Community = {
    ...comm.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  return {
    ...comm,
    _id: commCopy._id.toString(),
    name: commCopy.name,
    dateCreated: formatDate(commCopy.dateCreated),
    creator: commCopy.creator.toString()
  };
};

export {
  constructCommunityResponse
};