var express = require('express');
var router = express.Router();

var candidates = [];

/* GET candidates listing. */
router.get('/', function (req, res, next) {
    res.send(candidates);
});

router.get('/search', function (req, res, next) {
    if (!req.query.skills) {
        res.sendStatus(400);
    }

    const searchedSkills = req.query.skills.split(',');

    let highestSkillMatch = 0;
    let bestCandidate = null;

    candidates.forEach(candidate => {
        const matchingSkills = candidate.skills
            .filter(skill => searchedSkills.includes(skill));

        if (matchingSkills.length > highestSkillMatch) {
            bestCandidate = candidate;
            highestSkillMatch = matchingSkills.length;
        }
    })

    if (bestCandidate !== null) {
        res.send(bestCandidate);
    } else {
        res.sendStatus(404);
    }
});

router.post('/', function (req, res, next) {
    candidates.push(req.body);
    res.sendStatus(200);
})

module.exports = router;
