import FlashMessage from "@/Components/FlashMessage";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/Auntheticated/Index";
import { Link } from "@inertiajs/react";

export default function Index({ auth, flashMessage }) {
    return (
        <Authenticated user={auth.user}>
            <div className="w-40">
                <Link href={route("admin.dashboard.movie.create")}>
                    <PrimaryButton type="button">
                        Insert New Movie
                    </PrimaryButton>
                </Link>
            </div>
            {flashMessage?.message && (
                <FlashMessage message={flashMessage.message} />
            )}
        </Authenticated>
    );
}
