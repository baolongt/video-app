export const primary = "#212032";

export const width = 400;
export const height = (width * 2) / 3;
export const borderRadius = 8;

export const chunk = (arr) => {
	const newArr = [];
	while (arr.length) newArr.push(arr.splice(0, 3));
	return newArr;
};

export const Title = ({ title, dark }) => {
	return <h2 style={{ color: dark ? primary : "#fff" }}>{title}</h2>;
};
