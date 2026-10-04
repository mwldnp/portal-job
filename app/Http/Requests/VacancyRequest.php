<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class VacancyRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'dept_id' => ['required', 'exists:departments,id'],
            'position' => ['required', 'string', 'max:255'],
            'quota' => ['required', 'integer', 'min:1'],
            'description' => ['required', 'string', 'max:255'],
            'user_create' => ['required', 'string', 'max:255'],
            'user_update' => ['required', 'string', 'max:255'],
        ];
    }
}
