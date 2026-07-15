from PIL import Image

img = Image.open('public/logo.png')
width, height = img.size

# Crop to remove bottom 6 pixels
cropped_img = img.crop((0, 0, width, height - 6))

cropped_img.save('public/logo.png')
print("Cropped bottom edge successfully!")
