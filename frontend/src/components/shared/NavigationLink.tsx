import { Link } from "react-router-dom";

type Props = {
    to: string;
    bg: string;
    text: string;
    textColor: string;
    onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
    return (
        <Link
            className="nav-link"
            to={props.to}
            onClick={props.onClick}
            style={{
                background: props.bg,
                color: props.textColor,
                padding: "10px 15px", 
                borderRadius: "4px",
                textDecoration: "none",
                display: "inline-block"
            }}
        >
            {props.text}
        </Link>
    );
};

export default NavigationLink;