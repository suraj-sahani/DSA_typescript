export function check_string_palindrome(i: number, str: string) {
  const n = str.length;
  if (i >= Math.ceil(n / 2)) return true;

  if (str[i]?.toLowerCase() !== str[n - i - 1]?.toLowerCase()) return false;
  return check_string_palindrome(i + 1, str);
}

const start = performance.now();
const res = check_string_palindrome(0, "Madam");
const end = performance.now();
console.log(`Execution time : ${(end - start).toFixed(4)}ms`);
console.log(res);
