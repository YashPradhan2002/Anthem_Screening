import Membership from '../models/Membership.js';

export const gerMembership = async (req, res) => {
    try {
        const membership = await Membership.find({});
        res.json(membership);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};