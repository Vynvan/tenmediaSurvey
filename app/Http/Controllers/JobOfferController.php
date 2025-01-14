<?php

namespace App\Http\Controllers;

use App\Models\JobOffer;
use App\Http\Requests\StoreJobOfferRequest;
use App\Http\Requests\UpdateJobOfferRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class JobOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('JobOffers/Index', [
            'jobOffers' => JobOffer::with([
                'category:id,name',
                'company:id,name',
                'createdBy:id,name',
            ])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobOfferRequest $request)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'salary' => ['required', 'numeric'],
            'category_id' => ['required', 'exists:categories,id'],
            'company_id' => ['required', 'exists:companies,id'],
        ]);
        $request->user()->createdJobOffers()->create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'salary' => $validated['salary'],
            'category_id' => $validated['category_id'],
            'company_id' => $validated['company_id'],
            'user_id' => Auth::id(),
        ]);

        return redirect()->route('jobOffers.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(JobOffer $job)
    {
        return view('job.show', compact('job'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(JobOffer $job)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobOfferRequest $request, JobOffer $job)
    {
        $validated = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'salary' => ['required', 'numeric'],
            'category_id' => ['required', 'exists:categories,id'],
            'company_id' => ['required', 'exists:companies,id'],
        ]);
        $request->user()->createdJobOffers()->update($validated);

        return redirect()->route('job-offers.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JobOffer $job)
    {
        //
    }
}
