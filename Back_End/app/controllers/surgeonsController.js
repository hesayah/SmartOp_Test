const Intervention = require('../models/interventionsModel');

const getSurgeons = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;
        const searchQuery = req.query.search || '';

        const surgeons = await Intervention.aggregate([
            {
                $match: {
                    surgeon: { $regex: new RegExp(searchQuery, 'i') },
                },
            },
            {
                $group: {
                    _id: '$surgeon',
                    specialty: { $first: '$specialty' },
                    interventions: { $sum: 1 },
                    anesthetistFavori: { $first: '$anesthetist' },
                    nurseFavori: {
                        $first: {
                            $cond: [
                                { $gt: [{ $sum: ['$nurse1', '$nurse2'] }, '$nurse2'] },
                                '$nurse1',
                                '$nurse2',
                            ],
                        },
                    },
                    roomFrequente: { $first: '$roomNumber' },
                    acteFrequent: { $first: '$intervention' },
                },
            },
            {
                $sort: {
                    interventions: -1,
                    _id: 1, // Tri alphabétique en cas d'égalité dans le nombre d'opérations
                },
            },
            { $skip: skip },
            { $limit: limit },
        ]);

        const surgeonsDTO = surgeons.map((surgeon) => ({
            nom: surgeon._id,
            specialite: surgeon.specialty,
            interventions: surgeon.interventions,
            anesthesisteFavori: surgeon.anesthetistFavori,
            infirmiereFavorite: surgeon.nurseFavori,
            sallePlusFrequente: surgeon.roomFrequente,
            actePlusFrequent: surgeon.acteFrequent,
        }));

        res.json(surgeonsDTO);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

module.exports = {
    getSurgeons,
};
