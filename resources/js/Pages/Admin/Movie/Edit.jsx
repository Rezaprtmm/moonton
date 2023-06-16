import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Authenticated from "@/Layouts/Auntheticated/Index";
import { Link, Head, useForm } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Create({ auth, movie }) {
    const { data, setData, processing, errors } = useForm({
        ...movie,
    });

    const submit = (e) => {
        e.preventDefault();

        if (data.thumbnail === movie.thumbnail) {
            delete data.thumbnail;
        }
        Inertia.post(route("admin.dashboard.movie.update", movie.id), {
            _method: "PUT",
            ...data,
        });
    };
    return (
        <Authenticated user={auth.user}>
            <Head title="Admin - Create Movie" />
            <h1 className="text-xl">Update Movie: {movie.name}</h1>
            <hr className="mb-4" />
            <form onSubmit={submit}>
                <div>
                    <InputLabel forInput="name" value="Name" />
                    <TextInput
                        type="text"
                        name="name"
                        defaultValue={movie.name}
                        className="mb-4"
                        variant="primary-outline"
                        placeholder="Enter the name of the movie"
                        onChange={(e) => setData("name", e.target.value)}
                        isError={errors.name}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>
                <div>
                    <InputLabel forInput="category" value="Category" />
                    <TextInput
                        type="text"
                        name="category"
                        defaultValue={movie.category}
                        className="mb-4"
                        variant="primary-outline"
                        placeholder="Enter the category of the movie"
                        onChange={(e) => setData("category", e.target.value)}
                        isError={errors.name}
                    />
                    <InputError message={errors.category} className="mt-2" />
                </div>
                <div>
                    <InputLabel forInput="video_url" value="Video URL" />
                    <TextInput
                        type="url"
                        name="video_url"
                        defaultValue={movie.video_url}
                        className="mb-4"
                        variant="primary-outline"
                        placeholder="Enter the video url of the movie"
                        onChange={(e) => setData("video_url", e.target.value)}
                        isError={errors.video_url}
                    />
                    <InputError message={errors.video_url} className="mt-2" />
                </div>
                <div>
                    <InputLabel forInput="thumbnail" value="Thumbnail" />
                    <img
                        src={`/storage/${movie.thumbnail}`}
                        alt=""
                        className="w-40"
                    />
                    <TextInput
                        type="file"
                        name="thumbnail"
                        className="mb-4"
                        variant="primary-outline"
                        placeholder="Insert thumbnail of the movie"
                        onChange={(e) =>
                            setData("thumbnail", e.target.files[0])
                        }
                        isError={errors.thumbnail}
                    />
                    <InputError message={errors.thumbnail} className="mt-2" />
                </div>
                <div>
                    <InputLabel forInput="rating" value="Rating" />
                    <TextInput
                        type="number"
                        name="rating"
                        defaultValue={movie.rating}
                        className="mb-1"
                        variant="primary-outline"
                        placeholder="Enter the rating of the movie"
                        onChange={(e) => setData("rating", e.target.value)}
                        isError={errors.rating}
                    />
                    <InputError message={errors.rating} className="mt-2" />
                </div>
                <div className="flex flex-row mt-4 mb-4 items-center">
                    <InputLabel forInput="is_featured" value="Is Featured" />
                    <Checkbox
                        name="is_featured"
                        onChange={(e) =>
                            setData("is_featured", e.target.checked)
                        }
                        className="ml-3 mb-2"
                        checked={movie.is_featured}
                    />
                    <InputError
                        message={errors.is_featured}
                        className="ml-3 mb-2"
                    />
                </div>
                <PrimaryButton type="submit">Save</PrimaryButton>
            </form>
        </Authenticated>
    );
}
