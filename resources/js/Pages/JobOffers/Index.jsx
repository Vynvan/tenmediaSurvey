import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import JobOfferList from '@/Components/JobOfferList';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/react';

export default function Index({ auth, jobOffers }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        title: '',
        description: '',
        location: '',
        salary: '',
        category_id: '',
        company_id: '',
    });

    const handleCategoryChange = (selectedOption) => {
        setData('category_id', selectedOption ? selectedOption.value : '');
    };
    
    const handleCompanyChange = (selectedOption) => {
        setData('company_id', selectedOption ? selectedOption.value : '');
    };
    
    const loadCategories = async (inputValue) => {
        const response = await axios.get(route('api.categories.index'), {
            params: { search: inputValue }
        });
        return response.data.map(category => ({
            label: category.name,
            value: category.id
        }));
    };

    const loadCompanies = async (inputValue) => {
        const response = await axios.get(route('api.companies.index'), {
            params: { search: inputValue }
        });
        return response.data.map(company => ({
            label: company.name,
            value: company.id
        }));
    };

    const submit = e => {
        e.preventDefault();
        post(route('jobOffers.store'), { onSuccess: () => reset() });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">Job offers</h2>
            }>
            <Head title="Job offers" />

            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <input value={data.title} onChange={e => setData('title', e.target.value)}
                        placeholder='Title' type="text" name="title" id="title" required
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.title} className="mt-2" />

                    <textarea
                        value={data.description}
                        placeholder="Description"
                        className="mt-4 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('description', e.target.value)}>
                    </textarea>
                    <InputError message={errors.description} className="mt-2" />

                    <AsyncSelect
                        cacheOptions
                        loadOptions={loadCompanies}
                        defaultOptions
                        onChange={handleCompanyChange}
                        className="mt-4"
                        placeholder="Select Company"
                    />
                    <InputError message={errors.company_id} className="mt-2" />

                    <AsyncSelect
                        cacheOptions
                        loadOptions={loadCategories}
                        defaultOptions
                        onChange={handleCategoryChange}
                        className="mt-4"
                        placeholder="Select Category"
                    />
                    <InputError message={errors.category_id} className="mt-2" />

                    <input value={data.location} onChange={e => setData('location', e.target.value)}
                        placeholder='Location' type="text" name="location" id="location" required
                        className="mt-4 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.location} className="mt-2" />

                    <input value={data.salary} onChange={e => setData('salary', e.target.value)}
                        placeholder='Salary' type="number" name="salary" id="salary" step="0.01" min="0" required
                        className="mt-4 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                    />
                    <InputError message={errors.salary} className="mt-2" />

                    <PrimaryButton className="mt-4" disabled={processing}>
                        Save
                    </PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    <JobOfferList jobOffers={jobOffers} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
