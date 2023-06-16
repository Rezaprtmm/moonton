import { Link } from "@inertiajs/react";

export default function MenuItem({
    link,
    icon,
    text,
    isAactive,
    method = "get",
}) {
    return (
        <Link
            href={link ? route(link) : null}
            className={`side-link ${isAactive && "active"}`}
            method={method}
            as="button"
        >
            {icon}
            {text}
        </Link>
    );
}
