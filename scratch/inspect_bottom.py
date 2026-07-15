from PIL import Image

img = Image.open('public/logo.png')
pixels = img.load()
width, height = img.size

mid_x = width // 2
for y in range(125, height):
    row = []
    for x in range(mid_x - 3, mid_x + 3):
        row.append(pixels[x, y])
    print(f"Row {y}: {row}")
