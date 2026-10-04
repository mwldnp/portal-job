<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vacancy extends Model
{
    protected $fillable = ['dept_id', 'position', 'quota', 'description', 'user_create', 'user_update'];

    public function department(): BelongsTo
    {
        return $this->BelongsTo(Department::class, 'dept_id');
    }
}
