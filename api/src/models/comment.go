package models

import (
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	Content string `json:"content"`
	PostID  uint   `json:"post_id"`
	UserID  uint   `json:"user_id" gorm:"constraint:OnDelete:CASCADE"`
	Post    Post   `json:"-"`
	User    User   `json:"-"`
}

func (comment *Comment) Save() (*Comment, error) {
	err := Database.Create(comment).Error
	if err != nil {
		return &Comment{}, err
	}
	return comment, nil
}

func FetchCommentsByPostID(postID uint) (*[]Comment, error) {
	var comments []Comment
	err := Database.Where("post_id = ?", postID).Find(&comments).Error
	if err != nil {
		return &[]Comment{}, err
	}
	return &comments, nil
}

func FetchCommentByID(id uint) (*Comment, error) {
	var comment Comment
	err := Database.First(&comment, id).Error
	if err != nil {
		return &Comment{}, err
	}
	return &comment, nil
}

func DeleteCommentByID(id uint) error {
	var comment Comment

	// Find the comment
	if err := Database.First(&comment, id).Error; err != nil {
		return err
	}

	// Delete the comment record from the database
	if err := Database.Delete(&comment).Error; err != nil {
		return err
	}

	return nil
}
