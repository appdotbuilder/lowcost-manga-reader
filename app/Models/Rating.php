<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Rating
 *
 * @property int $id
 * @property int $user_id
 * @property int $story_id
 * @property int $rating
 * @property string|null $review
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read User $user
 * @property-read Story $story
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Rating newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rating newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Rating query()
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereReview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereStoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Rating whereUserId($value)
 * @method static \Database\Factories\RatingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Rating extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'story_id',
        'rating',
        'review',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'rating' => 'integer',
    ];

    /**
     * Get the user that owns the rating.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the story that the rating belongs to.
     */
    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }
}