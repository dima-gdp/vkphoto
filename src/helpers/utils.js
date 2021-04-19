export function getFullName(firstName, lastname) {
  if (!firstName || !lastname) {
    return `${firstName || lastname}`
  } else {
    return `${firstName} ${lastname}`
  }
}

export function debounce(f, ms) {
  let isCooldown = false;

  return function(...args) {
    if (isCooldown) return;

    f.apply(this, args);

    isCooldown = true;

    setTimeout(() => isCooldown = false, ms);
  };
}
