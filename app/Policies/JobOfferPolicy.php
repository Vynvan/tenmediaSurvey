<?php

namespace App\Policies;

use App\Models\JobOffer;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class JobOfferPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, JobOffer $job): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user !== null;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, JobOffer $job): bool
    {
        return $user !== null && $user->id === $job->created_by;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, JobOffer $job): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, JobOffer $job): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, JobOffer $job): bool
    {
        return $user->role === 'admin';
    }
}
