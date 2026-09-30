<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Vacancy extends Model
{
    protected $fillable = ['position', 'quota', 'description', 'user_create', 'user_update'];

    public function departement(): HasOne
    {
        return $this->hasOne(Department::class);
    }
}
