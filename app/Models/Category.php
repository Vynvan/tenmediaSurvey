<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    /** @use HasFactory<\Database\Factories\CategoryFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'created_by',
    ];

    public function jobOffers(): HasMany
    {
        return $this->hasMany(JobOffer::class);
    }

    public function createdBy(): HasMany
    {
        return $this->hasMany(User::class);
    }

}
