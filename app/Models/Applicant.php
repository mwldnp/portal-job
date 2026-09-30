<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Applicant extends Model
{
    protected $fillable = ['vacancy_id', 'name', 'gender', 'dob', 'address', 'no_telp', 'university', 'major', 'ipk', 'status', 'path_cv'];

    public function vacancy(): HasMany
    {
        return $this->hasMany(Vacancy::class);
    }
}
