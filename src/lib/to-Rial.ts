function ToRial(str: string | number | undefined | null) {
  if (typeof str !== "string") {
    str = str?.toString();
  }
  if (str === undefined || null) {
    str = "0";
  }

  str = str?.replace(/\,/g, "");
  var objRegex = new RegExp("(-?[0-9]+)([0-9]{3})");

  while (objRegex.test(str ?? "")) {
    str = str?.replace(objRegex, "$1,$2");
  }

  return `${str}  ریال`;
}

export default ToRial;
