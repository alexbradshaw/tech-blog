const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        User.create(
            {
                email: req.body.email,
                password: req.body.password
            })
            .then(newUser => res.status(200).json(newUser))
            .catch(err => res.status(400).json(err))

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/', async (req, res) => {
    try {
        const postsData = await Posts.findAll();

        const posts = postsData.map((Posts) => Posts.get({ plain: true }));

        res.render('homepage', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;