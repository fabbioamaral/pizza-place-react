import $ from "./MenuItemCard.module.css";

const MenuItemCard = ({title}: {title: string}) => {
  return (
    <div className={`${$.container} flex items-center justify-center`}>
      <p>{title}</p>
    </div>
  );
};

export default MenuItemCard;
