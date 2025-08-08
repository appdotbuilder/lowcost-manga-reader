<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Favorite
 *
 * @property int $id
 * @property int $user_id
 * @property int $story_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read User $user
 * @property-read Story $story
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Favorite newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Favorite newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Favorite query()
 * @method static \Illuminate\Database\Eloquent\Builder|Favorite whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Favorite whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Favorite whereStoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Favorite whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Favorite whereUserId($value)
 * @method static \Database\Factories\FavoriteFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Favorite extends Model
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
    ];

    /**
     * Get the user that owns the favorite.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the story that the favorite belongs to.
     */
    public function story(): BelongsTo
    {
        return $this->belongsTo(Story::class);
    }
}