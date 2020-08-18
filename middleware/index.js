var Campground = require("../models/campground");
var Comment = require("../models/comment");
//All The Middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	//is user logged in
	if(req.isAuthenticated()){
			Campground.findById(req.params.id, function(err, foundCampground){
			if(err){
				req.flash("error", "Campground Not Found!!");
				res.redirect("back");
			} else {
				//does user won the campgrounds
			if(foundCampground.author.id.equals(req.user._id)){
					next();
				}  else {
					req.flash("error", "You Don't Have Permission");
					res.redirect("back");
				}
			}
		});
	} else {
		req.flash("error", "You need to be logged in to do that");
		res.redirect("back");
	}
}


middlewareObj.checkCommentOwnership =function(req, res, next) {
	//is user logged in
	if(req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect("back");
		} else {
			//does user won the comment
		if(foundComment.author.id.equals(req.user._id)){
				next();
			}  else {
				req.flash("error", "You Don't have permission to do that");
				res.redirect("back");
			}
		}
	});
	} else {
		req.flash("error", "You Need To Be Logged In To Do That");
		res.redirect("back");
	}
}

middlewareObj.isLoggedIn = function(req, res, next)
{
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error", "You need to be logged in to do that!!");
	res.redirect("/login");
}

module.exports = middlewareObj