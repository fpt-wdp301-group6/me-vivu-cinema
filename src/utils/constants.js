const emailRegex =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const sthWentWrong = 'Đã có lỗi xảy ra';

const tmdbUrl = 'https://media.themoviedb.org/t/p';

const constants = { emailRegex, passwordRegex, phoneRegex, sthWentWrong, tmdbUrl };
export default constants;
