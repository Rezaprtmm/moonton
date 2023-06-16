import FlashMessage from "@/Components/FlashMessage";
import PrimaryButton from "@/Components/PrimaryButton";
import Authenticated from "@/Layouts/Auntheticated/Index";
import { Link, Head, useForm } from "@inertiajs/react";

export default function Index({ auth, flashMessage, movies }) {
    const { delete: destroy, put } = useForm();
    return (
        <Authenticated user={auth.user}>
            <Head title="List of Movies" />
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
            <table className="table-fixed w-full text-center mt-4">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th colSpan={2}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {movies.map((movie) => (
                        <tr key={movie.id}>
                            <td>
                                <img
                                    src={`/storage/${movie.thumbnail}`}
                                    alt={movie.name}
                                    className="w-23 rounded-md"
                                />
                            </td>
                            <td>{movie.name}</td>
                            <td>{movie.category}</td>
                            <td>{movie.rating.toFixed(1)}</td>
                            <td>
                                <Link
                                    href={route(
                                        "admin.dashboard.movie.edit",
                                        movie.id
                                    )}
                                >
                                    <PrimaryButton
                                        type="button"
                                        variant="warning"
                                    >
                                        Edit
                                    </PrimaryButton>
                                </Link>
                            </td>
                            <td>
                                <div
                                    onClick={() => {
                                        movie.deleted_at
                                            ? put(
                                                  route(
                                                      "admin.dashboard.movie.restore",
                                                      movie.id
                                                  )
                                              )
                                            : destroy(
                                                  route(
                                                      "admin.dashboard.movie.destroy",
                                                      movie.id
                                                  )
                                              );
                                    }}
                                >
                                    <PrimaryButton
                                        type="button"
                                        variant="danger"
                                    >
                                        {movie.deleted_at
                                            ? "Restore"
                                            : "Delete"}
                                    </PrimaryButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Authenticated>
    );
}
