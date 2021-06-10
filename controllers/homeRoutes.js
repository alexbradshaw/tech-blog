const router = require('express').Router();
const User = require('../models/User');
const Posts = require('../models/Posts');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      include: [{
        model: User,
        attributes: {exclude: ['id', 'password']}
      }]
      
    });

    const posts = postsData.map((Posts) => Posts.get({ plain: true }));
    res.render('homepage', { posts, 
      logged_in: req.session.logged_in  });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      where: {author_id: req.session.user_id},
      include: [{
        model: User,
        attributes: {exclude: ['id', 'password']}
      }]
      
    });

    const posts = postsData.map((Posts) => Posts.get({ plain: true }));
    res.render('this', { posts, 
      logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
