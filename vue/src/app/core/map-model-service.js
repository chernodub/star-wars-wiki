/** Maps userDto to User
 * @param {UserDto} userDto
 * @return {User}
 */
export function mapUser(userDto) {
  if (!userDto) return null;
  return {
    email: userDto.email,
  };
}
