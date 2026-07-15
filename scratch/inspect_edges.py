from PIL import Image

img = Image.open('public/logo.png')
pixels = img.load()
width, height = img.size

mid_y = height // 2

# Left edge
print("Left edge:")
for x in range(0, 5):
    col = []
    for y in range(mid_y - 2, mid_y + 2):
        col.append(pixels[x, y])
    print(f"Col {x}: {col}")

# Right edge
print("Right edge:")
for x in range(width - 5, width):
    col = []
    for y in range(mid_y - 2, mid_y + 2):
        col.append(pixels[x, y])
    print(f"Col {x}: {col}")
