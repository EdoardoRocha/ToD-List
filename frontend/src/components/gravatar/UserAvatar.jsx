import CryptoJS from "crypto-js";

export default function UserAvatar(props) {
  const cleanEmail = props.email.trim().toLowerCase();
  const hash = CryptoJS.MD5(cleanEmail).toString();
  const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=${props.size}&d=wavatar`;

  return (
    <img
      src={gravatarUrl}
      alt="Avatar do usuário"
      style={{ width: props.size, height: props.size }}
    />
  );
}
