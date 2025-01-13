import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CategoryList from '@/Components/CategoryList';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, categories }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
    });

    const submit = e => {
        e.preventDefault();
        post(route('categories.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Categories</h2>
            }>
            <Head title="Categories" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input value={data.name} onChange={e => setData('name', e.target.value)} placeholder='Name' type="text" name="name" id="name" required
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.message} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>
                        Save
                    </PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    <CategoryList categories={categories} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
