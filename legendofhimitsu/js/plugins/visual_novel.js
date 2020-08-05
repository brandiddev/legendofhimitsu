Sprite_Picture.prototype.loadBitmap = function() 
{
	this.bitmap = ImageManager.loadPicture(this._pictureName);
	var _Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
	Sprite_Picture.prototype.loadBitmap = function() 
	{
		var id = this._pictureId;
		if (/^p_/.test(this._pictureName)) 
		{
			this.bitmap = ImageManager.loadBitmap('img/pictures/visual_novel', this._pictureName, 0, true);
		} 
		else 
		{
			this.bitmap = ImageManager.loadBitmap('img/pictures/visual_novel', this._pictureName, 0, true);
		}
	}
};