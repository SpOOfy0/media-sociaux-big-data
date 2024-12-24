import numpy
from PIL import Image
from io import BytesIO
from base64 import b64encode


def __fig2data(fig):
  """ 
  Converts a figure to a data buffer.
  """
  fig.canvas.draw()
  w, h = fig.canvas.get_width_height()
  buf = numpy.fromstring(fig.canvas.tostring_argb(), dtype=numpy.uint8)
  buf.shape = (w, h, 4)

  # Change ARGB to RGBA
  buf = numpy.roll(buf, 3, axis=2)
  return buf


def fig2img(fig) -> str:
  """
  Converts a figure to an image data string.
  """
  # Gets the buffer from the figure
  buf = __fig2data(fig)
  w, h, d = buf.shape

  # Converts buffer to image data string.
  image = Image.frombuffer("RGBA", (w, h), buf)
  buffer = BytesIO()
  image.save(buffer, format="png")
  img_str = "data:image/png;base64," + b64encode(buffer.getvalue()).decode()
  return img_str