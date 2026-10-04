<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    protected $fillable = ['name'];

    public function vacancies(): HasMany
    {
        return $this->hasMany(Vacancy::class, 'dept_id');
    }
}
